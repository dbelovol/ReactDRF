import React from 'react'
import { normalize, schema } from 'normalizr';

const feature = new schema.Entity('features')
const page_short = new schema.Entity('pages',
{
    features: [feature]
}
)
export const pagesSchema = [page_short]

const paragraph = new schema.Entity('paragraphs')
const link = new schema.Entity('links')
const avatar = new schema.Entity('avatars')
const icon = new schema.Entity('icons')
const table_row =  new schema.Entity('table_rows')
const offer = new schema.Entity('offers')
const table = new schema.Entity('tables',
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
    offer:[{block: offer}]
}
)