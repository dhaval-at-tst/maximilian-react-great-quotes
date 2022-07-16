import { Fragment, useEffect } from "react";
import { Route, useParams, Link, useRouteMatch } from "react-router-dom";
import { getSingleQuote } from "../lib/api";
import Comments from './../components/comments/Comments';
import HighlightedQuote from './../components/quotes/HighlightedQuote';
import useHttp from './../hooks/use-http';
import LoadingSpinner from './../components/UI/LoadingSpinner';

const DUMMY_QUOTES = [
    { id: 'q1', author: 'Max', text: 'Learning React is fun!' },
    { id: 'q2', author: 'Maximilian', text: 'Learning React is great!' },
];

const QuoteDetail = () => {
    const match = useRouteMatch();
    const params = useParams();

    const { quoteId } = params;

    const { sendRequest, status, data: loadedQuote, error } = useHttp(getSingleQuote, true);


    useEffect(() => {
        sendRequest(quoteId);
    }, [sendRequest, quoteId]);


    if (status === 'pending') {
        return <div className='centered'><LoadingSpinner /></div>
    }

    if (error) {
        return <p className='centered focused'>{error}</p>
    }

    if (!loadedQuote.text) {
        return <p>No quote found!</p>
    }

    return (
        <Fragment>
            <h1 className="centered">Quote Detail Page</h1>
            <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
            <Route path={match.path} exact>
                <div className="centered">
                    <Link className='btn--flat' to={`${match.url}/comments`}>Load Comments</Link>
                </div>
            </Route>
            <Route path={`${match.path}/comments`}>
                <Comments />
            </Route>
        </Fragment>
    );
}

export default QuoteDetail;