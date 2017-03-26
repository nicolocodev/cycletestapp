import { div, input, p, a, makeDOMDriver } from '@cycle/dom'
import Rx from 'rxjs'

export function Words(sources) {

  const router =
    sources.DOM.select('a').events('click')
      .do(ev => ev.preventDefault())
      .map(ev => ev.target.pathname);

  const keyup$ =
    sources.DOM.select('input').events('keyup')
      .map(ev => ev.target.value);

  const message$ = 
    keyup$
    .startWith('<<type>>')
    .map(text => div([
      input('',{type:"text"}),
      p(text),
      a({ props: { href: '/' } }, 'Home')
    ]));


  // .map(function (ev) {
  //   ev.preventDefault();
  //   return ev.target.pathname;
  // });    

  const sinks = {
    DOM: message$,
    router
  }

  return sinks
}
