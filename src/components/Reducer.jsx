import React , { useReducer } from "react";

const ReducerComponent = () => {
    let initialTaskState = {
        complete: false,
       fields: [
        {
            name: 'prepTime',
            value: '',
            type: 'text',
            placeholder: 'Prep time',
            fieldType: 'textarea'
        },
        {
            name: 'cookTime',
            value: '',
            type: 'text',
            placeholder: 'Cook time',
            fieldType: 'field'
        },
        {
            name: 'cuisineType',
            fieldType: 'dropdown',
            value: 'African',
            options: [
                'African', 'Italian', 'Mexican'
            ]
        }
       ],
       subscribe: false
    }

    const reducer = (state, action) => {
        switch (action.type){
            case 'complete':
                return {...state, complete: action.payload.checked}
            case 'updateFieldValue':
                let stateData = {...state};
                stateData.fields[action.payload.index].value = action.payload.value;
                return stateData
            default:
                return state
        }
    }

    const [task, dispatch] = useReducer(reducer, initialTaskState);

    const toggleState = (status) => {
        dispatch({ type: 'complete', payload: { checked: status }})
    }

    const updateFieldValue = (index, value) => {
        dispatch({ type: 'updateFieldValue', payload: { index, value }})
    }

    console.log(task.fields)


    return <>
    <input type={'checkbox'} onChange={(event) => toggleState(event.target.checked)}/>
    <span>Change checkbox state</span>
    


    <div>Complete: {task.complete ? 'complete' : 'incomplete'}</div>
    <>
    {
        task.fields.map((field, index) => {
            return <div key={index}>
                    {
                    field.fieldType === 'textarea' ? <textarea 
                                                name={field.name} 
                                                value={field.value}
                                                placeholder={field.placeholder}
                                                onChange={event => updateFieldValue(index, event.target.value)}

                                                /> : field.fieldType === 'dropdown' ? <select value={field.value} onChange={event => updateFieldValue(index, event.target.value)}>
                                                    {
                                                        field.options.map((option, optionIndex) => {
                                                            return <option value={option} key={optionIndex}>{ option }</option>
                                                        })
                                                    }
                                                    </select> : <input 
                                                         onChange={event => updateFieldValue(index, event.target.value)}
                                                        type={field.type} 
                                                        value={field.vlaue}
                                                        placeholder={field.placeholder}
                                                       />
                    }
            </div>
        })
    }
    </>
    </>
}

export default ReducerComponent