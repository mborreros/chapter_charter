
function CollectionModal({ show, handleClose }){

  return(
    // conditial rendering based on button click to show modal 
		<>
		<div className={show ? "modal fade show" : "modal fade" } id="kt_modal_new_target" tabIndex="-1" style={show ? {display: "block"} : {display: "none"}} aria-hidden={show ? "true" : "false"} aria-modal={show ? "true" : "false"} role={show ? "dialog" : null}>
			{/* <!--begin::Modal dialog--> */}
			<div className="modal-dialog modal-dialog-centered mw-650px">
				{/* <!--begin::Modal content--> */}
				<div className="modal-content rounded">
					{/* <!--begin::Modal header--> */}
					<div className="modal-header pb-0 border-0 justify-content-end">

						{/* <!--begin::Close--> */}
						<button className="btn btn-sm btn-icon btn-active-color-primary" onClick={handleClose}>
							<span className="svg-icon svg-icon-1">
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="currentColor" />
									<rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="currentColor" />
								</svg>
							</span>
							{/* <!--end::Svg Icon--> */}
						</button>
						{/* <!--end::Close--> */}

					</div>
					{/* <!--begin::Modal header--> */}
					{/* <!--begin::Modal body--> */}
					<div className="modal-body scroll-y px-10 px-lg-15 pt-0 pb-15">
						{/* <!--begin:Form--> */}
						<form id="kt_modal_new_target_form" className="form" action="#">
							{/* <!--begin::Heading--> */}
							<div className="mb-13 text-center">
								{/* <!--begin::Title--> */}
								<h1 className="mb-3">Create a new Collection</h1>
								{/* <!--end::Title--> */}
								{/* <!--begin::Description--> */}
								<div className="text-muted fw-semibold fs-5">If you need more info, please check
								<a href="#" className="fw-bold link-primary">Project Guidelines</a>.</div>
								{/* <!--end::Description--> */}
							</div>
							{/* <!--end::Heading--> */}
							{/* <!--begin::Input group--> */}
							<div className="d-flex flex-column mb-8 fv-row">
								{/* <!--begin::Label--> */}
								<label className="d-flex align-items-center fs-6 fw-semibold mb-2">
									<span className="required">Target Title</span>
									<i className="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip" title="Specify a target name for future usage and reference"></i>
								</label>
								{/* <!--end::Label--> */}
								<input type="text" className="form-control form-control-solid" placeholder="Enter Target Title" name="target_title" />
							</div>
							{/* <!--end::Input group--> */}
							{/* <!--begin::Input group--> */}
							<div className="row g-9 mb-8">
								{/* <!--begin::Col--> */}
								{/* <div className="col-md-6 fv-row">
									<label className="required fs-6 fw-semibold mb-2">Assign</label>
									<select className="form-select form-select-solid" data-control="select2" data-hide-search="true" data-placeholder="Select a Team Member" name="target_assign">
										<option value="">Select user...</option>
										<option value="1">Karina Clark</option>
										<option value="2">Robert Doe</option>
										<option value="3">Niel Owen</option>
										<option value="4">Olivia Wild</option>
										<option value="5">Sean Bean</option>
									</select>
								</div> */}
								{/* <!--end::Col--> */}
								{/* <!--begin::Col--> */}
								<div className="col-md-6 fv-row">
									<label className="required fs-6 fw-semibold mb-2">Due Date</label>
									{/* <!--begin::Input--> */}
									<div className="position-relative d-flex align-items-center">
										{/* <!--begin::Icon--> */}
										{/* <!--begin::Svg Icon | path: icons/duotune/general/gen014.svg--> */}
										<span className="svg-icon svg-icon-2 position-absolute mx-4">
											<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path opacity="0.3" d="M21 22H3C2.4 22 2 21.6 2 21V5C2 4.4 2.4 4 3 4H21C21.6 4 22 4.4 22 5V21C22 21.6 21.6 22 21 22Z" fill="currentColor" />
												<path d="M6 6C5.4 6 5 5.6 5 5V3C5 2.4 5.4 2 6 2C6.6 2 7 2.4 7 3V5C7 5.6 6.6 6 6 6ZM11 5V3C11 2.4 10.6 2 10 2C9.4 2 9 2.4 9 3V5C9 5.6 9.4 6 10 6C10.6 6 11 5.6 11 5ZM15 5V3C15 2.4 14.6 2 14 2C13.4 2 13 2.4 13 3V5C13 5.6 13.4 6 14 6C14.6 6 15 5.6 15 5ZM19 5V3C19 2.4 18.6 2 18 2C17.4 2 17 2.4 17 3V5C17 5.6 17.4 6 18 6C18.6 6 19 5.6 19 5Z" fill="currentColor" />
												<path d="M8.8 13.1C9.2 13.1 9.5 13 9.7 12.8C9.9 12.6 10.1 12.3 10.1 11.9C10.1 11.6 10 11.3 9.8 11.1C9.6 10.9 9.3 10.8 9 10.8C8.8 10.8 8.59999 10.8 8.39999 10.9C8.19999 11 8.1 11.1 8 11.2C7.9 11.3 7.8 11.4 7.7 11.6C7.6 11.8 7.5 11.9 7.5 12.1C7.5 12.2 7.4 12.2 7.3 12.3C7.2 12.4 7.09999 12.4 6.89999 12.4C6.69999 12.4 6.6 12.3 6.5 12.2C6.4 12.1 6.3 11.9 6.3 11.7C6.3 11.5 6.4 11.3 6.5 11.1C6.6 10.9 6.8 10.7 7 10.5C7.2 10.3 7.49999 10.1 7.89999 10C8.29999 9.90003 8.60001 9.80003 9.10001 9.80003C9.50001 9.80003 9.80001 9.90003 10.1 10C10.4 10.1 10.7 10.3 10.9 10.4C11.1 10.5 11.3 10.8 11.4 11.1C11.5 11.4 11.6 11.6 11.6 11.9C11.6 12.3 11.5 12.6 11.3 12.9C11.1 13.2 10.9 13.5 10.6 13.7C10.9 13.9 11.2 14.1 11.4 14.3C11.6 14.5 11.8 14.7 11.9 15C12 15.3 12.1 15.5 12.1 15.8C12.1 16.2 12 16.5 11.9 16.8C11.8 17.1 11.5 17.4 11.3 17.7C11.1 18 10.7 18.2 10.3 18.3C9.9 18.4 9.5 18.5 9 18.5C8.5 18.5 8.1 18.4 7.7 18.2C7.3 18 7 17.8 6.8 17.6C6.6 17.4 6.4 17.1 6.3 16.8C6.2 16.5 6.10001 16.3 6.10001 16.1C6.10001 15.9 6.2 15.7 6.3 15.6C6.4 15.5 6.6 15.4 6.8 15.4C6.9 15.4 7.00001 15.4 7.10001 15.5C7.20001 15.6 7.3 15.6 7.3 15.7C7.5 16.2 7.7 16.6 8 16.9C8.3 17.2 8.6 17.3 9 17.3C9.2 17.3 9.5 17.2 9.7 17.1C9.9 17 10.1 16.8 10.3 16.6C10.5 16.4 10.5 16.1 10.5 15.8C10.5 15.3 10.4 15 10.1 14.7C9.80001 14.4 9.50001 14.3 9.10001 14.3C9.00001 14.3 8.9 14.3 8.7 14.3C8.5 14.3 8.39999 14.3 8.39999 14.3C8.19999 14.3 7.99999 14.2 7.89999 14.1C7.79999 14 7.7 13.8 7.7 13.7C7.7 13.5 7.79999 13.4 7.89999 13.2C7.99999 13 8.2 13 8.5 13H8.8V13.1ZM15.3 17.5V12.2C14.3 13 13.6 13.3 13.3 13.3C13.1 13.3 13 13.2 12.9 13.1C12.8 13 12.7 12.8 12.7 12.6C12.7 12.4 12.8 12.3 12.9 12.2C13 12.1 13.2 12 13.6 11.8C14.1 11.6 14.5 11.3 14.7 11.1C14.9 10.9 15.2 10.6 15.5 10.3C15.8 10 15.9 9.80003 15.9 9.70003C15.9 9.60003 16.1 9.60004 16.3 9.60004C16.5 9.60004 16.7 9.70003 16.8 9.80003C16.9 9.90003 17 10.2 17 10.5V17.2C17 18 16.7 18.4 16.2 18.4C16 18.4 15.8 18.3 15.6 18.2C15.4 18.1 15.3 17.8 15.3 17.5Z" fill="currentColor" />
											</svg>
										</span>
										{/* <!--end::Svg Icon--> */}
										{/* <!--end::Icon--> */}
										{/* <!--begin::Datepicker--> */}
										<input className="form-control form-control-solid ps-12" placeholder="Select a date" name="due_date" />
										{/* <!--end::Datepicker--> */}
									</div>
									{/* <!--end::Input--> */}
								</div>
								{/* <!--end::Col--> */}
							</div>
							{/* <!--end::Input group--> */}
							{/* <!--begin::Input group--> */}
							<div className="d-flex flex-column mb-8">
								<label className="fs-6 fw-semibold mb-2">Target Details</label>
								<textarea className="form-control form-control-solid" rows="3" name="target_details" placeholder="Type Target Details"></textarea>
							</div>
							{/* <!--end::Input group--> */}
							{/* <!--begin::Input group--> */}
							<div className="d-flex flex-column mb-8 fv-row">
								{/* <!--begin::Label--> */}
								<label className="d-flex align-items-center fs-6 fw-semibold mb-2">
									<span className="required">Tags</span>
									<i className="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip" title="Specify a target priorty"></i>
								</label>
								{/* <!--end::Label--> */}
								{/* <input className="form-control form-control-solid" value="Important, Urgent" name="tags" /> */}
							</div>
							{/* <!--end::Input group--> */}
							{/* <!--begin::Input group--> */}
							<div className="d-flex flex-stack mb-8">
								{/* <!--begin::Label--> */}
								<div className="me-5">
									<label className="fs-6 fw-semibold">Adding Users by Team Members</label>
									<div className="fs-7 fw-semibold text-muted">If you need more info, please check budget planning</div>
								</div>
								{/* <!--end::Label--> */}
								{/* <!--begin::Switch--> */}
								{/* <label className="form-check form-switch form-check-custom form-check-solid">
									<input className="form-check-input" type="checkbox" value="1" checked="checked" />
									<span className="form-check-label fw-semibold text-muted">Allowed</span>
								</label> */}
								{/* <!--end::Switch--> */}
							</div>
							{/* <!--end::Input group--> */}
							{/* <!--begin::Input group--> */}
							<div className="mb-15 fv-row">
								{/* <!--begin::Wrapper--> */}
								<div className="d-flex flex-stack">
									{/* <!--begin::Label--> */}
									<div className="fw-semibold me-5">
										<label className="fs-6">Notifications</label>
										<div className="fs-7 text-muted">Allow Notifications by Phone or Email</div>
									</div>
									{/* <!--end::Label--> */}
									{/* <!--begin::Checkboxes--> */}
									<div className="d-flex align-items-center">
										{/* <!--begin::Checkbox--> */}
										{/* <label className="form-check form-check-custom form-check-solid me-10">
											<input className="form-check-input h-20px w-20px" type="checkbox" name="communication[]" value="email" checked="checked" />
											<span className="form-check-label fw-semibold">Email</span>
										</label> */}
										{/* <!--end::Checkbox--> */}
										{/* <!--begin::Checkbox--> */}
										{/* <label className="form-check form-check-custom form-check-solid">
											<input className="form-check-input h-20px w-20px" type="checkbox" name="communication[]" value="phone" />
											<span className="form-check-label fw-semibold">Phone</span>
										</label> */}
										{/* <!--end::Checkbox--> */}
									</div>
									{/* <!--end::Checkboxes--> */}
								</div>
								{/* <!--end::Wrapper--> */}
							</div>
							{/* <!--end::Input group--> */}
							{/* <!--begin::Actions--> */}
							<div className="text-center">
								<button type="reset" id="kt_modal_new_target_cancel" className="btn btn-light me-3">Cancel</button>
								<button type="submit" id="kt_modal_new_target_submit" className="btn btn-primary">
									<span className="indicator-label">Submit</span>
									<span className="indicator-progress">Please wait...
									<span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
								</button>
							</div>
							{/* <!--end::Actions--> */}
						</form>
						{/* <!--end:Form--> */}
					</div>
					{/* <!--end::Modal body--> */}
				</div>
				{/* <!--end::Modal content--> */}
			</div>
			{/* <!--end::Modal dialog--> */}
		</div>
  
	

			<Modal show={show} onHide={() => handleClose()}
			dialogClassName="modal-90w"
			centered>
	
				{/* start modal content */}
					<Modal.Body>
	
							{/* start form */}
							<form id="kt_modal_new_target_form" className="form" action="submit" onSubmit={(e) => handleCollectionSubmit(e)}>
	
								{/* start header */}
								<Modal.Header className="border-0 justify-content-center">
									<h1 className="mb-3 text-center">Start a new Collection</h1>
								</Modal.Header>
								{/* end header */}
	
								{/* start collection name input group */}
								<div className="d-flex flex-column mt-8 mb-8 fv-row">
									{/* start label */}
									<label className="d-flex align-items-center fs-6 fw-semibold mb-2">
										<span className="required">Collection Name</span>
										<i className="fas fa-exclamation-circle ms-2 fs-7" data-bs-toggle="tooltip" title="Choose a name for your collection."></i>
									</label>
									{/* end label */}
									<input type="text" className="form-control form-control-solid" placeholder="Enter Collection Name" name="name" onChange={(e) => handleCollectionInput(e)}/>
								</div>
								{/* end collection name input group */}
	
								{/* start collection description input group */}
								<div className="d-flex flex-column mb-8">
									{/* start label */}
									<label className="fs-6 fw-semibold mb-2">
										<span className="required">Collection Description</span>
									</label>
									{/* end label */}
									<textarea className="form-control form-control-solid" rows="3" name="description" placeholder="Type Collection Description" onChange={(e) => handleCollectionInput(e)}></textarea>
								</div>
								{/* end collection description input group */}
	
								{/* start action buttons */}
								<div className="text-end">
									<button type="reset" id="kt_modal_new_target_cancel" className="btn btn-light btn-sm me-3">Clear</button>
									<button type="submit" id="kt_modal_new_target_submit" className="btn btn-primary btn-sm">
										<span className="indicator-label">Submit</span>
										<span className="indicator-progress">Please wait...
										<span className="spinner-border spinner-border-sm align-middle ms-2"></span></span>
									</button>
								</div>
								{/* end action buttons */}
	
							</form>
							{/* end form */}
						</Modal.Body>
						{/* end modal body */}
					{/* end modal content */}
			</Modal>
			</>
		)
		
	}

export default CollectionModal;