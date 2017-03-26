import Rx from 'rxjs'
import { run } from '@cycle/rxjs-run'
import { makeDOMDriver } from '@cycle/dom'

import { makeRouterDriver } from 'cyclic-router';
import { createHistory } from 'history';
import switchPath from 'switch-path';

import { Home } from './components/home'
import { Words } from './components/words'

const main = function (sources) {

    const match$ = sources.router.define({
        '/': Home,
        '/words': Words
    });

    const page$ =
        match$
            .map(({ path, value }) => {
                return value(Object.assign({}, sources, {
                    router: sources.router.path(path)
                }));
            });

    return {
        DOM: page$.switchMap(c => c.DOM),
        router: page$.switchMap(c => c.router).startWith('/')
    };
}

const drivers = {
    DOM: makeDOMDriver('#app'),
    router: makeRouterDriver(createHistory(), switchPath)
}

run(main, drivers)