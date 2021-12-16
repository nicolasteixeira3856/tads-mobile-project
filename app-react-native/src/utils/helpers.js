export function formatCurrency(num) {
    let ns = 'R$ ' + num.toFixed(2).replace('.', ',');
    ns = ns.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    return ns;
}