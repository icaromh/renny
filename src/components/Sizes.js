
const MAP_SIZES_LETTERS = ['PP', 'P', 'M', 'G', 'GG']
const MAP_SIZES_NUMBERS = ["34", "36", "38", "40", "42", "44", "46"]
const MAP_SIZES_NUMBERS_SHOES = ['34', '35', '36', '37', '38', '39', '40']
const MAP_SIZES_NUMBERS_SANDALS = ['33/34', '35/36', '37/38', '39/40']
const MAP_SIZES_NUMBERS_SLIPPER = ['34/35', '34/36', '36/37', '37/39', '38/39']
const MAP_SIZES_UNIQUE = ['U']

function getScale(categoryName, sizes) {
    if (sizes[0] === 'U') return MAP_SIZES_UNIQUE
    if (sizes[0].includes('/')) {
        return categoryName.includes("Pantufa") ? MAP_SIZES_NUMBERS_SLIPPER : MAP_SIZES_NUMBERS_SANDALS
    }
    if (sizes[0].includes('g')) return sizes

    if (!!categoryName && (categoryName.includes('Tênis') || categoryName.includes('Calçados'))) {
        return MAP_SIZES_NUMBERS_SHOES
    }

    const sizesIsNumber = Number.isNaN(Number.parseInt(sizes[0])) === false
    if (sizesIsNumber) return MAP_SIZES_NUMBERS
    else if (!sizesIsNumber) return MAP_SIZES_LETTERS

    return sizes
}


export default function Sizes({ sizes, categoryName }) {
    const scale = getScale(categoryName, sizes)

    return (
        <div className='sizes'>
            {scale.map(value => (
                <span key={value} className={`size-value ${sizes.includes(value) ? '' : 'out-of-stock'}`}>{value}</span>
            ))}
        </div>
    )
}