
  window.addEventListener("click", function () {
    localStorage.setItem("clickTime", new Date().getTime());
  });

  useEffect(() => {
    const interval = setInterval(() => {
      let current = new Date().getTime();
      const clickTime = localStorage.getItem("clickTime");

      if (current - clickTime > 120000) {
        setShow(true);
      }

      if (current - clickTime >300000) {
        localStorage.clear();
        // dispatch(clickExpireAction(true));
        history.go("/");

      }
    },60000);

    return () => {
      clearInterval(interval);
    };
  }, []);
