import profilePic from "../../assets/profile.jpg";
import { Image, Box } from "@chakra-ui/react"

export default function Home() {
  return (
      <Box className="aboutMain">
          <Box className="about">
            <h2 id="aboutH2">About Radiant Soul Esthetics</h2>
            <p>Step into Radiant Soul Esthetics and experience a world where beauty meets expertise! Founded and operated by
              Deidre Hallert, we specialize in providing top-notch esthetician services and professional permanent makeup
              solutions. With a passion for enhancing natural beauty and a dedication to client satisfaction, Deidre
              brings experience and a keen eye for detail to every appointment. Picture a cozy sanctuary where relaxation
              meets luxury. Whether you opt for permanent makeup or a rejuvenating session, get ready for a deluxe journey
              with the finest products and care. Welcome to your beauty haven!</p>
          </Box>
          <Box id="deidre">
            <Box className="deidre-container" mb={50}>
              <h2 id="meetH2">Meet Deidre</h2>
              <p>As the sole proprietor and lead esthetician at Radiant Soul Esthetics, Deidre is committed to delivering
                personalized care tailored to each client&apos;s unique needs. With her training and understanding of the
                latest trends and techniques in the beauty industry, Deidre strives to exceed expectations with every
                service, whether it&apos;s a relaxing facial, precise eyebrow microblading, or flawless permanent makeup
                application. Her goal is to help you achieve your outer glow so that you can radiate from within.</p>
              <Box display="flex" justifyContent="center" align="center">
              <Image id="aboutImg" objectFit="cover" boxSize="300px" src={profilePic} alt="picture of Deidre"/>
              </Box>
            </Box>
          </Box>
      </Box>
  )
}