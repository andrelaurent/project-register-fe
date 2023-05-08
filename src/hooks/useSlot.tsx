import React from 'react'

const useSlot = (children: any) => {
    const slots = React.Children.toArray(children).reduce((result:any, child:any) => {
        if (child.props && child.props.slot) {
            result[child.props.slot] = child;
        } else {
            result.default.push(child);
        }
        return result
    }, { default: [] })
  
    
    const Slot = ({ name, children: slotChildren }:any) => {
        if (!name) {
            return slots.default.length ? slots.default : (slotChildren || null);
        }
        return slots[name] || slotChildren || null;
    }
    return Slot;
};

export default useSlot