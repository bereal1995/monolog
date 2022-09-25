import { PageObjectResponse, RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'

export const getTitleFromPage = (
  page: PageObjectResponse,
  titleKey: string = 'Name'
) => {
  let title: RichTextItemResponse[] = []
  if (page.parent.type === 'page_id' || page.parent.type === 'workspace') {
    title = (page.properties.title as {
      type: 'title';
      title: Array<RichTextItemResponse>;
      id: string;
  }).title
  } else if (page.parent.type === 'database_id') {
    title = (page.properties[titleKey] as {
      type: 'title';
      title: Array<RichTextItemResponse>;
      id: string;
  }).title
  }
  return title.map(({ plain_text }) => plain_text).join('')
}
