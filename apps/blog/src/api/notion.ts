import { Client, isFullBlock, isFullPage, iteratePaginatedAPI } from '@notionhq/client'
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_API_KEY })

export const getNotionPage = async (page_id?: string) => {
  if (!page_id) return

  const response = await await notion.pages.retrieve({
    page_id,
  })

  if (!isFullPage(response)) {
    return
  }

  return response
}

export const getRootBlockChildren = async () => {
  if (!process.env.NEXT_PUBLIC_NOTION_DATABASE_ID) return

  const result = []

  // const response = await notion.blocks.children.list({
  //   block_id: process.env.NEXT_PUBLIC_NOTION_DATABASE_ID,
  //   page_size: 50,
  // })

  for await (const block of iteratePaginatedAPI(notion.blocks.children.list, {
    block_id: process.env.NEXT_PUBLIC_NOTION_DATABASE_ID,
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
