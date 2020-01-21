import React from 'react'
import { normalize, schema } from 'normalizr';

const feature = new schema.Entity('features')
const global_tag_attrs = new schema.Entity('glob_attrs')
const global_pictures = new schema.Entity('glob_picts')
const data_item = new schema.Entity('data')
const global_tags = new schema.Entity('glob_tags',
{glob_attrs:[global_tag_attrs]}
)
const page_short = new schema.Entity('pages',
{
    features: [feature]
}
)
export const pagesSchema = [page_short]
export const globaldataSchema = new schema.Object({
    glob_picts:[global_pictures],
    pages: [page_short],
    data:[data_item],
    glob_tags:[global_tags]
})



const paragraph = new schema.Entity('paragraphs')
const link = new schema.Entity('links')
const avatar = new schema.Entity('avatars')
const icon = new schema.Entity('icons')
const table_row =  new schema.Entity('table_rows')
const offer = new schema.Entity('offer')
const page_tag_attr = new schema.Entity('attrs')
const page_tag = new schema.Entity('page_tags',
{attrs: [page_tag_attr]}
)
const table = new schema.Entity('table',
{table_rows: [table_row]}
)
const icon_block = new schema.Entity('icon_blocks',
{icons: [icon]}
)
const avatar_block = new schema.Entity('avatar_blocks',
{avatars: [avatar]}
)
const link_block = new schema.Entity('link_blocks',
{links: [link]}
)
const text_block = new schema.Entity('text_blocks',
{paragraphs: [paragraph]}
)

export const pageSchema = new schema.Object(
{
    text_blocks: [{block: text_block}],
    link_blocks:[{block: link_block}],
    avatar_blocks:[{block: avatar_block}],
    icon_blocks:[{block: icon_block}],
    table:[{block: table}],
    offer:[{block: offer}],
    page_tags:[page_tag]
}
)