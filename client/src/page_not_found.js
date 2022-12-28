function PageNotFound() {
  return (
      <div id="kt_app_toolbar" className="app-toolbar page-not-found-background py-3 py-lg-6 h-600px">
        <div id="kt_app_toolbar_container" className="app-container container-xxl">

            <h1 className="text-gray-700">Page Not Found</h1>
            <p className="text-gray-600 mb-0">It seems you were looking for something that does not exist.</p>
            <p className="text-gray-600">Click on the navigation bar to find what you are looking for!</p>

        </div>
      </div>
  );
}

export default PageNotFound;