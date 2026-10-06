import {usePortfolio} from '../shared/portfolio';
import {Contact} from '../../../css/portfolio/layout/PortfolioLayout.styles';
import {Eyebrow} from '../../../css/portfolio/shared/PortfolioTypography.styles';
import emailIcon from '../../../assets/icons/gmail.svg';

const ContactSection = ({compact = false}: {compact?: boolean}) => {
    const {portfolio} = usePortfolio();
    return (
    <Contact $compact={compact}>
        <div>
            <Eyebrow>HAVE AN IDEA?</Eyebrow>
            <h2>
                Let’s make something <em>unnecessarily cool.</em>
            </h2>
        </div>
        <a className="contact-link" href={`mailto:${portfolio.email}`}>
            Get in touch <img src={emailIcon} alt="" aria-hidden="true" width={24} height={24} />
        </a>
    </Contact>
    );
};

export default ContactSection;
