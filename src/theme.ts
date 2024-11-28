import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const customConfig = defineConfig({
    theme: {
        tokens: {
            fonts: {
                heading: {value: `'Bai Jamjuree', snas-serif`},
                body: {value: `'Bai Jamjuree', snas-serif`},
                text: {value: `'Bai Jamjuree', snas-serif`},
            },
            fontSizes: {
                heading: {value: '10px'},
                body: {value: "20px"}
            },
        }
    },
})

export const systemConfig = createSystem(defaultConfig, customConfig)