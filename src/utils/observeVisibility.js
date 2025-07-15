export const observeVisibility = (element, callback) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      callback(entry.isIntersecting);
    });
  });
  observer.observe(element);
};