import BlockOfLinks from '../Butt_base.jsx'
import IconListWithText from '../IconListWithText.jsx'
import AvatarList from '../AvatarList.jsx'
import BlockOfText from '../BlockOfText.jsx'
import Table from "../Table.jsx"
import Offer from '../Offer.jsx'


export const componentMap = {
    "link_blocks": BlockOfLinks,
    "icon_blocks": IconListWithText,
    "avatar_blocks": AvatarList,
    "text_blocks": BlockOfText,
    "table": Table,
    "offer": Offer

} 

export const blockMap = {
    "link_blocks": "links",
    "icon_blocks": "icons",
    "avatar_blocks": "avatars",
    "text_blocks": "paragraphs",
    "table":"table_rows"
}