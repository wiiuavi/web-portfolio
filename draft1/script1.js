function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none')
    document.getElementById(pageId).style.display = 'block'
}