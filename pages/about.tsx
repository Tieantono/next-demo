import { ReactElement } from "react";
import { NextPageWithLayout } from "./layouts/NextPageWithLayout";
import CustomLayout from "./layouts/CustomLayout";

const About: React.FC = () => {
    return (
        <div>
            <h1>About Us</h1>
            <p>Accelist Edukasi Indonesia.</p>
        </div>
    )
}

const AboutPage: NextPageWithLayout = () => {
    return <About></About>
}

AboutPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <CustomLayout>
            {page}
        </CustomLayout>
    )
}

export default AboutPage;