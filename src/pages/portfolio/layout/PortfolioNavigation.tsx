import {Link, NavLink} from 'react-router';
import {usePortfolio} from '../shared/portfolio';
import {CollectionNav} from '../../../css/portfolio/layout/PortfolioLayout.styles';

const PortfolioNavigation = () => {
    const {collections} = usePortfolio();
    return (
    <CollectionNav aria-label="Portfolio collections">
        <Link to="/portfolio/">← Overview</Link>
        <div>
            {collections.map((collection) => (
                <NavLink key={collection.id} to={`/portfolio/${collection.id}/`}>
                    {collection.title}
                </NavLink>
            ))}
        </div>
    </CollectionNav>
    );
};

export default PortfolioNavigation;
