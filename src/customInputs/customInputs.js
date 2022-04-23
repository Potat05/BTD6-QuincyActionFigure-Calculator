
/*

    For better styling or functionality

    <element data_custom_input="*TYPE*" />

    TYPES
        selection
        integer

*/

const input_class = 'custom-input';

const attribute_name = 'data-custom-input';

const input_types = {
    selection: 'selection',
    integer: 'integer'
}

// Import custom CSS
const css = document.createElement('link');
css.setAttribute('rel', 'stylesheet');
css.setAttribute('href', './src/customInputs/customInputs.css');
document.head.appendChild(css);

/**
 * Normal selection styling is doodoo, So I gatta use this.
 * @param {HTMLDivElement} elem 
 */
function input_selection(elem=null) {
    if(elem == null) return;
    if(elem.getAttribute(attribute_name) != input_types.selection) return;
    if(elem.classList.contains(input_class)) return;
    elem.classList.add(input_class);

    const text = document.createTextNode(null);
    elem.prepend(text);
    function setSelection(option) {
        elem.querySelectorAll('div').forEach(o => o.removeAttribute('selected'));
        option.setAttribute('selected', '');
        const str = option.innerText;
        text.textContent = str;
        elem.value = str;
    }
    setSelection(elem.querySelector('[selected]'));

    elem.addEventListener('click', ev => {
        if(ev.target == elem) {
            if(!elem.classList.contains('expanded')) {
                elem.classList.add('expanded');
            } else {
                elem.classList.remove('expanded');
            }
        } else {
            setSelection(ev.target);

            elem.classList.remove('expanded');

            elem.dispatchEvent(new Event('change'));
        }
    });

    elem.addEventListener('wheel', ev => {
        const ch = (ev.deltaY == 0 ? 0 : (ev.deltaY < 0 ? -1 : 1));

        const options = elem.querySelectorAll('div');

        let index = 0;
        options.forEach((option, i) => {
            if(!option.hasAttribute('selected')) return;
            index = i;
        });

        const newIndex = Math.min(Math.max(index+ch, 0), options.length-1);

        if(newIndex == index) return;

        setSelection(options.item(newIndex));

        elem.dispatchEvent(new Event('change'));
    });

}

document.addEventListener('click', ev => {
    document.querySelectorAll(`[${attribute_name}="${input_types.selection}"]`).forEach(elem => {
        if(elem == ev.target) return;
        elem.classList.remove('expanded');
    });
});

/**
 * Better
 * @param {HTMLDivElement} elem 
 */
function input_integer(elem=null) {
    if(elem == null) return;
    if(elem.getAttribute(attribute_name) != input_types.integer) return;
    if(elem.classList.contains(input_class)) return;
    elem.classList.add(input_class);

    elem.addEventListener('wheel', ev => {
        if(document.activeElement == elem) return;

        const ch = (ev.deltaY == 0 ? 0 : (ev.deltaY < 0 ? 1 : -1));
        elem.value = Math.max(parseInt(elem.value) + ch, elem.min || -Infinity);
        elem.dispatchEvent(new Event('change'));
    });
}


// New custom inputs
/**
 * 
 * @param {Node|NodeList} node 
 */
function custom_input(node) {
    if(node instanceof NodeList) {
        node.forEach(custom_input);
        return;
    }

    input_selection(node);
    input_integer(node);
}

custom_input(document.querySelectorAll(`*[${attribute_name}]`))

new MutationObserver((mutations) => {
    custom_input(mutations);
}).observe(document.body, { subTree: true, attributeFilter: [attribute_name] });
