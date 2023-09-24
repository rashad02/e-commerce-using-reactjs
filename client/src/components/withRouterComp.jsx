import { useLocation, useNavigate, useParams } from "react-router-dom";

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        console.log(props)
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return <Component {...props} router={{ location, navigate, params }} />;
    }

    return ComponentWithRouterProp;
}

export default withRouter;
