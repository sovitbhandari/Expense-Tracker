import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
    }

    :root {
        --primary-color: #222260; /* Dark blue */
        --primary-color2: rgba(34, 34, 96, .6); /* Semi-transparent dark blue */
        --primary-color3: rgba(34, 34, 96, .4); /* More transparent dark blue */
        --color-green: #42AD00; /* Bright green */
        --color-grey: #aaa; /* Light grey */
        --color-accent: #F56692; /* Bright pink */
        --color-red: #FF0000; /* Bright red */
    }

    body {
        font-family: 'Nunito', sans-serif;
        font-size: clamp(1rem, 1.5vw, 1.2rem);
        color: #222260; /* Dark color for better contrast */
    }

    h1, h2, h3, h4, h5, h6 {
        color: var(--primary-color); /* Ensures headers stand out */
    }


    .error {
        color: red;
        animation: shake 0.5s ease-in-out;
        @keyframes shake {
            0% {
                transform: translateX(0);
            }
            25% {
                transform: translateX(10px);
            }
            50% {
                transform: translateX(-10px);
            }
            75% {
                transform: translateX(10px);
            }
            100% {
                transform: translateX(0);
            }
        }
    }
`;
