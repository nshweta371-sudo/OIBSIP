// =========================================
// SIMPLE JAVASCRIPT FOR TRIBUTE PAGE
// =========================================

window.addEventListener("scroll", function () {

    const scrollPosition =
        window.innerHeight + window.scrollY;

    const pageHeight =
        document.documentElement.scrollHeight;

    if (scrollPosition >= pageHeight - 5) {

        console.log(
            "Thank you for exploring the life and achievements of Dr. A.P.J. Abdul Kalam."
        );

    }

});