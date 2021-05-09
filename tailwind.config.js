// tailwind.config.js
module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                theme: {
                    1: "#E86060",
                    2: "#662323",
                    3: "#FF7676",
                    4: "#fff", 
                    5: "#828282 ",
                    6: "#BDBDBD"                 
                },
            },
            gridTemplateRows: {
                // Simple 8 row grid
               '12': 'repeat(12, minmax(0, 1fr))',
      
                // Complex site-specific row configuration
               'layout': '200px minmax(900px, 1fr) 100px',
            },
            gridRow: {
                'span-12': 'span 12 / span 12',
                'span-11': 'span 11 / span 12',
                'span-10': 'span 10 / span 12',
                'span-9': 'span 9 / span 12',
            },
           
        },
    },
    variants: {},
    plugins: [],
}