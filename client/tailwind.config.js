/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      margin : {
        '2.5' : '10px',
      },
      spacing :{
        '2.5' : '10px',
        '15px' : '15px',
        '15vh': '15vh',
        '60vh': '60vh',
        '65vh': '65vh',
        '70vh': '70vh',
        '225' : '900px',
      },
      maxWidth : {
        '128': '32rem',   // 512px
        '144': '36rem',   // 576px
        '160': '40rem',   // 640px
        '176': '44rem',   // 704px
        '192': '48rem',   // 768px
        '208': '52rem',   // 832px
        '224': '56rem',   // 896px
        '240': '60rem',   // 960px
        '256': '64rem',   // 1024px
        '288': '72rem',   // 1152px
        '320': '80rem',   // 1280px
        '384': '96rem',   // 1536px
      },
      padding : {
        '5p': '5%',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, #9ed7ff, #ffffff, #9ed7ff)',
      },
      backgroundSize: {
        'custom-size': '800px 50px',
      },  
    },
  },
  plugins: [],
}

