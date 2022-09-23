import { Client } from '@notionhq/client'

const notion = new Client({ auth: process.env.NEXT_PUBLIC_NOTION_API_KEY })

export const getNotionPage = async () => {
  if (!process.env.NEXT_PUBLIC_NOTION_DATABASE_ID) return

  const response = await notion.pages.retrieve({
    page_id: process.env.NEXT_PUBLIC_NOTION_DATABASE_ID
    // page_size: 50
  })
  return response
}
