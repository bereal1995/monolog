import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_API_KEY })

export const getNotionPage = async (page_id?: string) => {
  if (!page_id) return

  const response = await notion.pages.retrieve({
    page_id,
  })
  return response
}

export const getNotionBlocks = async () => {
  if (!process.env.NEXT_PUBLIC_NOTION_DATABASE_ID) return

  const response = await notion.blocks.children.list({
    block_id: process.env.NEXT_PUBLIC_NOTION_DATABASE_ID,
    page_size: 50,
    // start_cursor
  })

  return response
}
