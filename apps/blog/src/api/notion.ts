import { Client, isFullBlock, iteratePaginatedAPI } from '@notionhq/client'
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_API_KEY })

// export const getNotionPage = async (page_id?: string) => {
//   if (!page_id) return

//   const response = await notion.pages.retrieve({
//     page_id,
//   })
//   return response
// }

export const getBlocks = async (block_id: string) => {
  const response = await notion.blocks.retrieve({
    block_id,
  })

  return response
}

export const getRootBlockChildren = async () => {
  if (!process.env.NEXT_PUBLIC_NOTION_DATABASE_ID) return

  const response = await notion.blocks.children.list({
    block_id: process.env.NEXT_PUBLIC_NOTION_DATABASE_ID,
    page_size: 50,
  })

  return response
}

export const getBlockChildren = async (block_id: string) => {
  const response = await notion.blocks.children.list({
    block_id,
    page_size: 50,
  })

  return response
}

export type BlockType = BlockObjectResponse & { children?: BlockObjectResponse[] }

export const getFullBlocks = async (parentBlockId: string) => {
  const fullBlocks: BlockType[] = []
  for await (const block of iteratePaginatedAPI(notion.blocks.children.list, {
    block_id: parentBlockId,
  })) {
    if (isFullBlock(block)) {
      fullBlocks.push(block)
    }
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
