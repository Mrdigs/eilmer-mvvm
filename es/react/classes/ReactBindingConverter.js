import ReactBindingContext from './ReactBindingContext';
import { ConverterBase, ConverterException } from '../../converters';

class ReactBindingConverter extends ConverterBase {
  constructor(converter) {
    super(converter);
  }

  convertFrom(viewModelValue, bindingContext) {
    bindingContext.setAttribute('type', viewModelValue?._proto_);
    return super.convertFrom(...arguments);
  }

  convertTo(viewValue, bindingContext) {
    console.log('ReactBindingConverter: ', bindingContext.getAttribute('type'));
    return super.convertTo(...arguments);
  }

  handleConverterException(exception, bindingContext, componentProperties, viewValue) {
    if (exception instanceof ConverterException) {
      if (bindingContext instanceof ReactBindingContext) {
        const props = {
          invalid: true
        };

        if (typeof viewValue !== 'undefined') {
          props[bindingContext.componentProperty] = viewValue;
        }

        exception.handled = bindingContext.setComponentProperties(props);
      }
    }
  }

}

export default ReactBindingConverter;