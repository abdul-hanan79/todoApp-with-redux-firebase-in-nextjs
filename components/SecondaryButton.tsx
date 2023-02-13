import { SearchIcon,AddIcon,DeleteIcon,EditIcon } from "@chakra-ui/icons"
import { Box, IconButton } from "@chakra-ui/react"
import react from "react"

const SecondaryButton = (props:any) => {
    return (
        <IconButton onClick={props.onClick} aria-label='edit database' icon={props.icon} />
    )
}
export default SecondaryButton