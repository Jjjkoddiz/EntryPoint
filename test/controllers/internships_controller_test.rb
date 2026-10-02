require "test_helper"

class InternshipsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @internship = internships(:one)
  end

  test "should get index" do
    get internships_url
    assert_response :success
  end

  test "should get new" do
    get new_internship_url
    assert_response :success
  end

  test "should create internship" do
    assert_difference("Internship.count") do
      post internships_url, params: { internship: { company_id: @internship.company_id, deadline: @internship.deadline, description: @internship.description, format: @internship.format, location: @internship.location, salary: @internship.salary, source_url: @internship.source_url, title: @internship.title } }
    end

    assert_redirected_to internship_url(Internship.last)
  end

  test "should show internship" do
    get internship_url(@internship)
    assert_response :success
  end

  test "should get edit" do
    get edit_internship_url(@internship)
    assert_response :success
  end

  test "should update internship" do
    patch internship_url(@internship), params: { internship: { company_id: @internship.company_id, deadline: @internship.deadline, description: @internship.description, format: @internship.format, location: @internship.location, salary: @internship.salary, source_url: @internship.source_url, title: @internship.title } }
    assert_redirected_to internship_url(@internship)
  end

  test "should destroy internship" do
    assert_difference("Internship.count", -1) do
      delete internship_url(@internship)
    end

    assert_redirected_to internships_url
  end
end
