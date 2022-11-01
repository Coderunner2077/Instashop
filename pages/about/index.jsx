import React from "react";
import { useRouter } from "next/router";
import { AiOutlineTwitter } from "react-icons/ai";
import { FaReact, FaFacebookF } from "react-icons/fa";
import { GrStripe } from "react-icons/gr";
import { IconLink } from "../../components/UI";
import { SiRedux, SiTailwindcss, SiPrisma, SiNextdotjs } from "react-icons/si";
import { MdOutlineEmail } from "react-icons/md";
import { useDispatch } from "react-redux";
import { showModal } from "../../store/actions";
import { ContactUs } from "../../components";
import { ErrorContext } from "../../context";
import nodemailerSrc from "../../assets/nodemailer_icon.png";
import sanitySrc from "../../assets/sanity_icon.png";
import Image from "next/image";


const About = () => {
    const router = useRouter();

    const handleGoHome = () => {
        router.push("/");
    }

    const handleGoBack = () => {
        router.back();
    }

    const dispatch = useDispatch();

    const handleContact = () => {
        dispatch(showModal({ title: "Contact us", body: <ErrorContext errors={["name", "email", "message"]}><ContactUs /></ErrorContext> }));
    }

    return (
        <div className="article terms w-11/12 text-justify whitespace-pre-line">
            <h2 className="my-2 text-left text-base sm:text-2xl"><strong>Welcome to Instashop!</strong></h2>
            <div className="md:flex gap-2 w-full">
                <div className="px-2">
                    <p>Instashop is a purely illustrative ecommerce website. Feel welcome to test it, no credit card required</p>
                </div>
            </div>
            <p>In order to test the website and simulate a purchase, after being redirected to the payment page, you should:</p>
            <ul className="list-disc my-2">
                <li>Use the credit card number <span className="font-semibold">4242 4242 4242 4242</span>. This is to be entered in the payment form</li>
                <li>Use a valid expiration date such as 12/34</li>
                <li>Use any three-digit CVC code (four digits for American Express cards)</li>
                <li>Use the value of your choice for the other fields of the form</li>
            </ul>

            <p>What makes Instashop great:</p>
            <ul className="list-disc">
                <li>Being able to use the intuitive Sanity Studio to add products to the store</li>
                <li>Integrating Sanity product models with regular database models (Order, Review, User)</li>
                <li>The whole payment process is delegated to Stripe</li>
                <li>Easy to replicate ecommerce website</li>
            </ul>

            <h3 className="my-1 font-bold flex w-full text-left justify-start underline text-base sm:text-2xl">Tools and Technologies used</h3>
            <h4 className="my-0.5 font-semibold flex w-full justify-start text-sm sm:text-xl">On the frontend:</h4>

            <ul className="grid grid-cols-4 sm:grid-cols-8 gap-x-2 gap-y-5">
                <li><IconLink to="https://nextjs.org" color="text-gray-900" text="Next.js" key="Next.js"><SiNextdotjs size={30} /></IconLink></li>
                <li><IconLink to="https://fr.reactjs.org" color="text-sky-600" text="React" key="React"><FaReact size={30} /></IconLink></li>
                <li><IconLink to="https://redux.js.org" color="text-purple-600" text="Redux" key="Redux"><SiRedux size={30} /></IconLink></li>
                <li><IconLink to="https://tailwindcss.com" color="text-sky-700" text="TailwindCSS" key="TailwindCSS"><SiTailwindcss size={26} /></IconLink></li>
                <li><IconLink to="https://www.sanity.io" bg="bg-white" color="text-white" text="Sanity" key="Sanity"><Image src={sanitySrc} /></IconLink></li>
                <li><IconLink to="https://stripe.com" bg="bg-blue-800" color="text-white" text="Stripe" key="Stripe"><GrStripe size={30} /></IconLink></li>
            </ul>

            <h4 className="my-0.5 font-semibold flex w-full justify-start text-sm sm:text-xl">On the backend:</h4>

            <ul className="grid grid-cols-6 gap-x-2 gap-y-5">
                <li><IconLink to="https://nextjs.org" color="text-gray-900" text="Next.js" key="Next.js-backend"><SiNextdotjs size={30} /></IconLink></li>
                <li><IconLink to="https://www.prisma.io" color="text-indigo-900" text="Prisma" key="Prisma"><SiPrisma size={30} /></IconLink></li>
                <li><IconLink to="https://nodemailer.com/about" bg="bg-white" text="Nodemailer" key="Nodemailer"><Image src={nodemailerSrc} /></IconLink></li>
            </ul>

            <h3 className="my-1 font-bold flex w-full justify-start underline text-base sm:text-2xl">Contact me</h3>

            <ul className="flex w-full justify-start gap-x-20 sm:gap-x-32 gap-y-5 sm:ml-20 sm:p-2">
                <li><IconLink to="https://twitter.com/coderunner2077" color="text-sky-600" text="Via Twitter" key="Via Twitter"><AiOutlineTwitter size={30} /></IconLink></li>
                <li><IconLink to="https://www.facebook.com/coderunner2077/" bg="bg-blue-800" color="text-white" text="Via Facebook" key="Via Facebook"><FaFacebookF size={26} /></IconLink></li>
                <li><IconLink onClick={handleContact} color="text-blue-600" text="Via Email" key="Via Email"><MdOutlineEmail size={30} /></IconLink></li>
            </ul>

            <div className="flex-x w-full">
                <button onClick={handleGoHome} className="btn btn-link mx-2 my-1 px-2 py-1 sm:px-3 sm:py-2">
                    Back To Home
                </button>
                <button onClick={handleGoBack} className="btn btn-link mx-2 my-1 px-2 py-1 sm:px-3 sm:py-2">
                    Previous Page
                </button>
            </div>
        </div>
    );
};

export default About;