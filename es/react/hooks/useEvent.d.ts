import EventBinding from "../../events/classes/EventBinding";
import { EventListener } from "../../events/types";
export default function useEvent<VM extends object, P extends keyof VM & string>(viewModel: VM, eventName: P, listener?: EventListener): EventBinding<VM, P>;
//# sourceMappingURL=useEvent.d.ts.map