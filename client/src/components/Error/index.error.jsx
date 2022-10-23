import ErrorImage from '../../assets/image/404.svg';

// Style import
import { ErrorWrapper, ErrorTitle, Illustration, ErrorSubtitle } from './style.error';

function Error() {
    return (
        <ErrorWrapper>
            <ErrorTitle>Oups !</ErrorTitle>
            <Illustration src={ErrorImage} alt="Erreur 404" />
            <ErrorSubtitle>
                Il semblerait que la page que vous cherchez n'existe pas.
            </ErrorSubtitle>
        </ErrorWrapper>
    );
};

export default Error;
