require 'test_helper'

class DragonsControllerTest < ActionController::TestCase
  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:dragons)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create dragon" do
    assert_difference('Dragon.count') do
      post :create, :dragon => { }
    end

    assert_redirected_to dragon_path(assigns(:dragon))
  end

  test "should show dragon" do
    get :show, :id => dragons(:one).to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => dragons(:one).to_param
    assert_response :success
  end

  test "should update dragon" do
    put :update, :id => dragons(:one).to_param, :dragon => { }
    assert_redirected_to dragon_path(assigns(:dragon))
  end

  test "should destroy dragon" do
    assert_difference('Dragon.count', -1) do
      delete :destroy, :id => dragons(:one).to_param
    end

    assert_redirected_to dragons_path
  end
end
