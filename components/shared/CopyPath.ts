function CopyPath() {
  return navigator.clipboard.writeText(window.location.href);
}

export default CopyPath;
