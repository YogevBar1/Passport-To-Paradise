import "./Home.css";
import imageSource from "../../../Assets/Images/home-image.jpeg"

function Home(): JSX.Element {
    return (
        <div className="Home">
            <h2>About</h2>
            <img src={imageSource}></img>
            <br></br>
            <p>Welcome to Passport To Paradise, your gateway to unforgettable journeys and remarkable adventures across the globe. At Passport To Paradise, we believe that travel is not just a hobby; it's a transformative experience that enriches your life in countless ways. Our mission is to make your travel dreams come true by providing you with the resources, inspiration, and support you need to explore the world's most incredible destinations.

                Whether you're an intrepid explorer seeking the thrill of an off-the-beaten-path expedition, a luxury traveler yearning for opulent escapes, or a family looking for memorable vacations, Passport To Paradise has you covered. We offer a curated selection of handpicked destinations, expert travel tips, and personalized itineraries to help you create the perfect getaway.

                Our team of passionate globetrotters is dedicated to ensuring that every journey you embark on is a seamless and magical experience. We're committed to responsible and sustainable tourism, aiming to preserve the beauty of our planet for generations to come.

                Join us on a voyage of discovery, relaxation, and adventure. With Passport To Paradise, the world is your oyster, and the possibilities are endless. Start planning your next unforgettable adventure today!</p>
        </div>
    );
}

export default Home;
