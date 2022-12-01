import { Client, isFullBlock, isFullPage, iteratePaginatedAPI } from '@notionhq/client'
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

import { NOTION } from '../constants/notion'

const notion = new Client({ auth: NOTION.NOTION_API_KEY })

export const getNotionPage = async (page_id?: string) => {
  if (!page_id) return

  const response = await notion.pages.retrieve({
    page_id,
  })

  if (!isFullPage(response)) {
    return
  }

  return response
}

export const getRootBlockChildren = async () => {
  if (!NOTION.DEFAULT_PAGE_DATABASE_ID) return

  const result = []

  for await (const block of iteratePaginatedAPI(notion.blocks.children.list, {
    block_id: NOTION.DEFAULT_PAGE_DATABASE_ID,
  })) {
    if (!isFullBlock(block)) {
      continue
    }
    result.push(block)
  }

  return result
}

export type BlockType = BlockObjectResponse & { children?: BlockObjectResponse[]; index?: number }

export const getFullBlocks = async (parentBlockId: string) => {
  const fullBlocks = []
  for await (const block of iteratePaginatedAPI(notion.blocks.children.list, {
    block_id: parentBlockId,
  })) {
    if (!isFullBlock(block)) {
      continue
    }
    fullBlocks.push(block)
  }

  return fullBlocks
}

const getBlockWithChildren = async (block: BlockType) => {
  if (!block.has_children) return block

  const children = await getFullBlocks(block.id)

  if (typeof block.children === 'undefined') {
    block.children = await getBlocksWithChildren(children)
  }

  return block
}

export const getBlocksWithChildren = async (blocks: BlockType[]) => {
  return await Promise.all(
    blocks.map(async (block) => {
      return await getBlockWithChildren(block)
    }),
  )
}

export const getNotionDatabase = async (database_id: string) => {
  const postPages = []
  const fullOrPartialPages = await notion.databases.query({
    database_id,
  })
  for (const page of fullOrPartialPages.results) {
    if (!isFullPage(page)) {
      continue
    }
    postPages.push(page)
  }
  return postPages
}
