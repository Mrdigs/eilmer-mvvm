import { useMemo } from "react"
import ReactBinder from "../classes/ReactBinder"

export default function useBinder<VM extends object>(viewModel: VM) {
  return useMemo(() => {
    return new ReactBinder(viewModel)
  }, [viewModel])
}
