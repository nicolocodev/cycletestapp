import { div, h1, a, makeDOMDriver } from '@cycle/dom'
import Rx from 'rxjs'


export function Home(sources) {

  const router =
    sources.DOM.select('a').events('click')
    .do(ev => ev.preventDefault())
    .map(ev => ev.target.pathname);

  var vtree$ = Rx.Observable.of(div([
    h1('', 'Index'),
    a({ props: { href: '/words' } }, 'Words')
  ]));

  const sinks = {
    DOM: vtree$,
    router
  }

  return sinks
}

