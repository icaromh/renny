import { useEffect, useState } from "react"
import { useInView } from 'react-intersection-observer';

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


export default function Sizes({ sizes, categoryName, data }) {
    const [inventory, setInventory] = useState({})
    const [isLoaded, setLoaded] = useState(false)
    // const scale = getScale(categoryName, sizes)
    const productId = `582642395`
    const skuList = data.sku_list.join(',')
    const { ref, inView, entry } = useInView({
        /* Optional options */
        threshold: 0,
    });

    const isAvailable = (size) => {
        return inventory[size] || false
    }

    useEffect(() => {
        if (inView) {
            const getInventory = async () => {
                await fetch(`http://127.0.0.1:8787/inventory?productId=${productId}&skuList=${skuList}`)
                    .then(res => res.json())
                    .then((data) => setInventory(data))
                    .finally(() => setLoaded(true))
            }
            getInventory()
        }

    }, [inView, productId, skuList])

    return (
        <div className='sizes' ref={ref}>
            {!isLoaded ? (
                <span className="size-value">🕑</span>
            ) : data.sku_list.map((value, idx) => (
                <span key={value} className={`size-value ${isAvailable(value) ? '' : 'out-of-stock'}`}>{data.size[idx]}</span>
            ))}
        </div>
    )
}