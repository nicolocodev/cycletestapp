import { div, input, p, a, makeDOMDriver } from '@cycle/dom'
import Rx from 'rxjs'

export function Words(sources) {

  const router =
    sources.DOM.select('a').events('click')
      .do(ev => ev.preventDefault())
      .map(ev => ev.target.pathname);
            
      // .map(function (ev) {
      //   ev.preventDefault();
      //   return ev.target.pathname;
      // });    

  const sinks = {
    DOM: Rx.Observable.of(a({ props: { href: '/' } }, 'Home')),
    router
  }

  return sinks
}
