import Link from "next/link";
import Container from "../Container";
import FooterList from "./FooderList";

const Footer = () => {
    return (
        <footer className="bg-slate-700 text-slate-200 text-sm mt-16">
            <Container>
                <div className="flex flex-row md:flew-col justify-center pt-8 pb-8">
                    <h3>Whitebook</h3>
                    {/* <FooterList>
                        <h3 className="text-base font-bold mb-2">Shop Category</h3>
                        <Link href="#">Phone</Link>
                        <Link href="#">Laptops</Link>
                        <Link href="#">Destops</Link>
                        <Link href="#">Watchs</Link>
                        <Link href="#">TVs</Link>
                        <Link href="#">Accessories</Link>
                    </FooterList>
                    <FooterList>
                        <h3 className="text-base font-bold mb-2">Shop Category</h3>
                        <Link href="#">Phone</Link>
                        <Link href="#">Laptops</Link>
                        <Link href="#">Destops</Link>
                        <Link href="#">Watchs</Link>
                        <Link href="#">TVs</Link>
                        <Link href="#">Accessories</Link>
                    </FooterList>
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 className="text-base font-bold mb-2">Abount Us</h3>
                    </div> */}
                </div>
            </Container>
        </footer>
        // <div>Footer</div>
    )
}
export default Footer;