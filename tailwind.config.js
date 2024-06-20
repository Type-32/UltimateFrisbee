/** @type {import('tailwindcss').Config} */
import {iconsPlugin, getIconCollections} from "@egoist/tailwindcss-icons"

export const content = ["./src/**/*.{html,js,vue,jsx,ts,tsx}"]
export const theme = {
    extend: {},
}
export const plugins = [
    iconsPlugin({
        // Select the icon collections you want to use
        // You can also ignore this option to automatically discover all individual icon packages you have installed
        // If you install @iconify/json, you should explicitly specify the collections you want to use, like this:
        collections: getIconCollections(["mdi", "fa", "fa-solid"]),
        // If you want to use all icons from @iconify/json, you can do this:
        // collections: getIconCollections("all"),
        // and the more recommended way is to use `dynamicIconsPlugin`, see below.
    }),
]