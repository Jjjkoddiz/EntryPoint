class SubscriptionsController < ApplicationController
  def create
    
    @subscription = Subscription.find_or_initialize_by(email: subscription_params[:email])

    
    if @subscription.persisted? || @subscription.save
      respond_to do |format|
        format.turbo_stream { render :show } 
      end
    else
      respond_to do |format|
        format.turbo_stream { render :error }
      end
    end
  end

  private

  def subscription_params
    params.expect(subscription: [ :email ])
  end
end
