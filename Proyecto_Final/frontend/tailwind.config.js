/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      width: {
        '10r': '10rem', 
        '15r': '15rem', 
        '20r': '20rem', 
        '25r': '25rem', 
        '30r': '30rem', 
        '35r': '35rem', 
        '40r': '40rem', 
        '45r': '45rem', 
        '50r': '50rem', 
      }
    }, 
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

