import { useEffect, useMemo, useRef, useState } from "react"
import EventBinding from "../../events/classes/EventBinding"
import { EventListener } from "../../events/types"

// Oh right I see. The way it's supposed to work is that it will
// cause a re-render if *EITHER* no listener function is given *or*
// one is given and it returns true.

// useCommand *used* to do that as well, but I don't think that's 
// very useful whereas in this case it's quite good.


type BindingState = {
    binding?: EventBinding;
  };

export default function useEvent(viewModel: object, eventName: string, listener: EventListener = null) {
    const [state, setState] = useState<BindingState>({});

    state.binding = useMemo(() => {
      return new EventBinding(viewModel, eventName);
    }, [viewModel, eventName]);
  
    useEffect(() => {
      // The use of useEffect here ensures that the binding becomes unbound
      // when either the component unbinds, or is re-bound to another property
      return state.binding.bind((...args: any[]) => {
        // Here on receiving the event, a re-render is not triggered unless
        // no listener function has been given *or* it returns true
        if (typeof listener !== 'function' || listener(...args)) {
          setState((state) => ({ ...state }))
        }
      });
    }, [state.binding]);
  
    // TODO: Unfortunately, the requirement to preserve the correct types
    // in the yeilded tuple is not yet implemented in TypeScript.
    // See: https://github.com/microsoft/TypeScript/issues/43150
    return state.binding

    /*
      const oldInstance = useRef(viewModel)
      const [ state, setState ] = useState(() => ({
        binding: new EventBinding(viewModel, eventName)
      }))
  
      useEffect(() => {
        if (viewModel !== oldInstance.current) {
          oldInstance.current = viewModel
          setState({
            binding: new EventBinding(viewModel, eventName)
          })
        }
        state.binding.bind((...args) => {
            // What is supposed to happen here? What is going to happen 
            // is that the listener isn't going to get called, but the 
            // component is going to re-render. 


          if (typeof listener !== 'function' || listener(...args)) {
            setState(state => ({ ...state }))
          }
        })
        return state.binding.unbind.bind(state.binding)
      }, [viewModel])
  
      return state.binding
      */
}
  