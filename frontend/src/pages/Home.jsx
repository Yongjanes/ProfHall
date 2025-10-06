import Hero from "../components/Hero.jsx"
import Cards from "../components/Cards.jsx"
import Card from "../components/Card.jsx"
import Usage from "../components/Usage.jsx"
import CTA from "../components/CTA.jsx"


function Home() {
    return (
        <div>
            <Hero />
            <Cards>
                <Card 
                    icon={<svg fill="#000000" height="200px" width="200px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 489.6 489.6" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M316.353,410.5V429c0,14.7-10.8,26.8-24.9,28.7l-4.5,16.6c-2.6,8.9-10.8,15.3-19.8,15.3h-44.7c-9.6,0-17.9-6.4-19.8-15.3 l-4.5-16.6c-14-1.9-24.9-14-24.9-28.7v-18.5c0-9.6,7.7-17.9,17.9-17.9h107.8C308.653,393.3,316.353,401,316.353,410.5z M330.453,334.9c-3.2,20.1-20.9,35.2-41.2,35.2h-88.9c-20.8,0-38.2-14.8-41.2-35.2c-3.6-23.2-14.5-45.2-30.7-62 c-28.6-30-44.6-68.9-45.3-109.8c-0.7-89.3,71-162.5,159.8-163.1h1.2c89.5,0,162.3,72.3,162.3,161.1c0,41.6-16.5,82.4-45.3,111.9 C344.753,289.9,334.053,311.3,330.453,334.9z M335.753,248.2c22.4-23,35.3-54.7,35.3-87.2c0-69.3-56.9-125.6-126.9-125.6h-1 c-69.2,0.5-125.1,57.6-124.6,127.3c0.5,31.8,13.1,62.2,35.4,85.6c21.2,21.8,35.5,50.7,40.2,81.2c0.5,3.6,3.5,5.1,6.2,5.1h27.7 V230.7l-37-37c-6.5-6.5-6.5-17.1,0-23.7l0,0c6.5-6.5,17.1-6.5,23.7,0l30,30l30-30c6.5-6.5,17.1-6.5,23.7,0l0,0 c6.5,6.5,6.5,17.1,0,23.7l-37,37v103.9h27.7c3.3,0,5.8-2.7,6.2-5.2C300.153,298.7,314.053,270.5,335.753,248.2z"></path> </g> </g> </g></svg>}
                    title="Beautiful Themes"
                    description="Choose from our curated collection of professionally designed themes that make your links look stunning."
                />
                <Card
                    icon={<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3 8L15 8M15 8C15 9.65686 16.3431 11 18 11C19.6569 11 21 9.65685 21 8C21 6.34315 19.6569 5 18 5C16.3431 5 15 6.34315 15 8ZM9 16L21 16M9 16C9 17.6569 7.65685 19 6 19C4.34315 19 3 17.6569 3 16C3 14.3431 4.34315 13 6 13C7.65685 13 9 14.3431 9 16Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>}
                    title="Easy Customization"
                    description="Personalize every aspect of your page with our intuitive editor. No coding required."
                />
                <Card
                    icon={<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>domain</title> <g id="Layer_2" data-name="Layer 2"> <g id="invisible_box" data-name="invisible box"> <rect width="48" height="48" fill="none"></rect> </g> <g id="icons_Q2" data-name="icons Q2"> <path d="M24,2A22,22,0,1,0,46,24,21.9,21.9,0,0,0,24,2ZM40.1,16H35.2a27.8,27.8,0,0,0-3-8A18.5,18.5,0,0,1,40.1,16ZM42,24a17.5,17.5,0,0,1-.5,4H35.8c.1-1.3.2-2.6.2-4s-.1-2.7-.2-4h5.7A17.5,17.5,0,0,1,42,24ZM6,24a17.5,17.5,0,0,1,.5-4h5.7c-.1,1.3-.2,2.6-.2,4s.1,2.7.2,4H6.5A17.5,17.5,0,0,1,6,24Zm10,0c0-1.4.1-2.7.2-4H22v8H16.2C16.1,26.7,16,25.4,16,24ZM26,6.7a11.7,11.7,0,0,1,3,3.7A21.7,21.7,0,0,1,31.1,16H26Zm-4,0V16H16.9A21.7,21.7,0,0,1,19,10.4,11.7,11.7,0,0,1,22,6.7ZM22,32v9.3a11.7,11.7,0,0,1-3-3.7A21.7,21.7,0,0,1,16.9,32Zm4,9.3V32h5.1A21.7,21.7,0,0,1,29,37.6,11.7,11.7,0,0,1,26,41.3ZM26,28V20h5.8c.1,1.3.2,2.6.2,4s-.1,2.7-.2,4ZM15.8,8a27.8,27.8,0,0,0-3,8H7.9A18.5,18.5,0,0,1,15.8,8ZM7.9,32h4.9a27.8,27.8,0,0,0,3,8A18.5,18.5,0,0,1,7.9,32Zm24.3,8a27.8,27.8,0,0,0,3-8h4.9A18.5,18.5,0,0,1,32.2,40Z"></path> </g> </g> </g></svg>}
                    title="Custom Domains"
                    description="Use your own domain for a professional touch. Keep your brand front and center."
                />
            </Cards>
            <Usage />
            <CTA />
        </div>
    )
}

export default Home