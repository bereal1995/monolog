import { PageObjectResponse, RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'

import { BlockType } from '../api/notion'

export const getTitleFromPage = (page?: PageObjectResponse, titleKey: string = 'Name') => {
  if (!page) return ''
  let title: RichTextItemResponse[] = []
  if (page.parent.type === 'page_id' || page.parent.type === 'workspace') {
    title = (
      page.properties.title as {
        type: 'title'
        title: Array<RichTextItemResponse>
        id: string
      }
    ).title
  } else if (page.parent.type === 'database_id') {
    title = (
      page.properties[titleKey] as {
        type: 'title'
        title: Array<RichTextItemResponse>
        id: string
      }
    ).title
  }
  return title.map(({ plain_text }) => plain_text).join('')
}

const setBlock = (block: BlockType, index: number) => {
  if (block.type !== 'numbered_list_item' && !block.children) return block

  if (block.type === 'numbered_list_item') {
    block.index = index
  }

  if (block.children) {
    block.children = setBlocksWithChildren(block.children)
  }

  return block
}

export const setBlocksWithChildren = (blocks: BlockType[]) => {
  let index = 0
  blocks.map((block) => {
    if (block.type === 'numbered_list_item') {
      index++
    } else {
      index = 0
    }

    return setBlock(block, index)
  })

  return blocks
}

type AnnotationKey = keyof RichTextItemResponse['annotations']
export const createClassName = (annotations: RichTextItemResponse['annotations']) =>
  Object.keys(annotations).reduce((acc, key) => {
    const annotationKey = key as AnnotationKey
    if (annotationKey === 'color') return acc
    if (annotations[annotationKey]) {
      return acc + ` ${annotationKey}`
    }
    return acc
  }, '')
