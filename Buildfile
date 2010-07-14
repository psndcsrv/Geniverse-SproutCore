# ===========================================================================
# Project:   Geniverse
# Copyright: ©2010 The Concord Consortium
# ===========================================================================


config :all, :required => [:sproutcore, :cc], :load_fixtures => true
proxy '/geniverse/', :to => 'geniverse.dev.concord.org'
proxy '/chat/', :to => 'geniverse.dev.concord.org'
proxy "/rails", :to => "localhost:3000"