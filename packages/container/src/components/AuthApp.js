import { mount } from 'auth/AuthApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default ({ onSignIn }) => {
    const ref = useRef(null);
    const history = useHistory();

    useEffect(() => {
        const { onParentNavigate } = mount(ref.current, {
            initialPath: history.location.pathname,

            // Renaming location.pathname property to nextPathname
            onNavigate: ({ pathname: nextPathname }) => {
                const { pathname } = history.location;

                if (pathname !== nextPathname) {
                    history.push(nextPathname);
                }
            },
            // onSignIn: () => {
            //     // console.log('User sign in');
            //     onSignIn();
            // }
            onSignIn,
        });

        history.listen(onParentNavigate);
    }, []);

    return <div ref={ref} />;
};
