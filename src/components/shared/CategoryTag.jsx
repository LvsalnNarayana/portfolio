import {
    Chip,
} from "@mui/material";
const CategoryTag = ({ data: {
    tag,
    getRandomColor
} }) => {
    return (
        <Chip
            key={tag}
            label={tag}
            size="small"
            color={getRandomColor()}
            sx={{
                px: 1,
                py: 1.5,
                border: "1px",
                borderStyle: "solid",
                color: "common.white",
                fontSize: "0.8rem",
                letterSpacing: "0.08em",
            }}
        />
    )
}

export default CategoryTag